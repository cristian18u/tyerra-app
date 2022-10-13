import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VideoDocument = Video & Document;

@Schema()
export class Video {
    @Prop()
    date: string;

    // @Prop()
    // user: string;

    @Prop()
    title: string;

    @Prop()
    url: string;

    @Prop()
    imgUrl: string;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
