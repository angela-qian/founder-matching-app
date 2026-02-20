"use client";
import TagInput from "@/app/components/TagInput"

const Register = () => {
  return (
    <TagInput tags={["HI"]} onChange={(newTags) => { /* handle tags */ }} placeholder="Add a tag"></TagInput>
  )
}

export default Register