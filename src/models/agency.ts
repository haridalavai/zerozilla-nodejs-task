import mongoose from 'mongoose';

export interface AgencyAttrs {
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  phoneNumber: number;
}

interface AgencyDoc extends mongoose.Document {
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  phoneNumber: number;
}

interface AgencyModel extends mongoose.Model<AgencyDoc> {
  build(attrs: AgencyAttrs): AgencyDoc;
}

const agencySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.agencyId = ret._id;
        delete ret.__v;
        delete ret._id;
      },
    },
  }
);

agencySchema.statics.build = (attrs: AgencyAttrs) => {
  return new Agency(attrs);
};

const Agency = mongoose.model<AgencyDoc, AgencyModel>('Agency', agencySchema);

export { Agency };
