"use client";

import { useState } from "react";

export default function ImageUploader() {
    const [file,setFile] = useState();
    const handleSubmit = async (e) =>{
        // console.log(file);
e.preventDefault();
if (!file){
    alert("Please select a file");
    return;
}
const data = new FormData();
data.append('file',file);
try{
    let result = await fetch('api/upload-image',{
        method: 'POST',
        body:data
    })
    result = await result.json();
    if(result.success) {
        alert('Image uploaded successfully');
    }
    else{
        alert('Error while uploading image: '+result.error);
    }
}
catch(error){
    console.error(error);
    alert('Error while uploading image: '+error.message);
 
}
    }
  return (
   
    <div>
      <h2>Upload Image in Next JS</h2>
      <form onSubmit={handleSubmit}>
<input type="file" name='file' onChange={(e)=> setFile(e.target.files?.[0])}/> <br /> <br />
<button type='submit'>Upload</button>
      </form>
    </div>
  )
}

