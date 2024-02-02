import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/app/prisma";


const s3 = new S3Client({
    region: process.env.NEXT_AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_AWS_S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.NEXT_AWS_S3_SECRET_ACCESS_KEY || '',
    },
});


async function uploadFileToS3(file: Buffer, fileName: string) {
    const fileBuffer = file;
    console.log(fileName);
    let folder = "images/";
    let uuidFileName = uuidv4();
    const params = {
        Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME || '',
        Key: folder + uuidFileName,
        Body: fileBuffer,
        ContentType: 'image/jpeg',
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);
    const s3Url = `https://${process.env.NEXT_AWS_S3_BUCKET_NAME}.s3.amazonaws.com/${folder}${uuidFileName}`;

    const imgInfo = {
        folder: folder,
        uuid: uuidFileName,
        url: s3Url,
    }

    return imgInfo;
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await (file instanceof Blob ? file.arrayBuffer() : new Response(file).arrayBuffer()));
        const imgInfo = await uploadFileToS3(buffer, (file instanceof File ? file.name : ''));


        prisma.image.create(
            {
                data: {
                    folder: imgInfo.folder,
                    uuid: imgInfo.uuid,
                    url: imgInfo.url,
                }
            }
        ).then((res) => { console.log("ADDED") }).catch((e) => { });


        return NextResponse.json({ status: '200', Info: imgInfo },);
    }
    catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}