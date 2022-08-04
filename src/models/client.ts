import mongoose from 'mongoose';

export interface ClientAttrs {
  agencyId: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  phoneNumber: number;
  totalBill: number;
}

interface ClientDoc extends mongoose.Document {
  agencyId: mongoose.Schema.Types.ObjectId;
  name: string;
  email: string;
  phoneNumber: number;
  totalBill: number;
}

interface ClientModel extends mongoose.Model<ClientDoc> {
  build(attrs: ClientAttrs): ClientDoc;
}

const clientSchema = new mongoose.Schema(
  {
    agencyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Agency',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    totalBill: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.clientId = ret._id;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

clientSchema.statics.build = (attrs: ClientAttrs) => {
  return new Client(attrs);
};

const Client = mongoose.model<ClientDoc, ClientModel>('Client', clientSchema);

export { Client };
