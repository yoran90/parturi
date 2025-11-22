import mongoose from "mongoose";



const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: [{
    type: String,
    required: true,
  }],
});



const aboutSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  imageTitles: [
    {
      type: String,
      required: true,
    }
  ],
  sections: [sectionSchema],

}, { timestamps: true });

const About = mongoose.model("About", aboutSchema);
export default About;