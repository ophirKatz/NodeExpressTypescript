import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const PostSchema = new Schema({
	title: String,
	body: String
});