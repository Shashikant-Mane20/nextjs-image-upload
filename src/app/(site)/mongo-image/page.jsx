"use client";
import {useState} from 'react';
const UploadMongoImage = () => {
    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(!file){
            alert('Please select a file');
            return;
        }
        const data = new FormData()
        data.append('file', file);
        try{
            let result = await fetch('/api/upload-mongo-image',{
                method: 'POST',
                body: data,
            })
            result = await result.json();
            if(result.success){
                alert('Image uploaded successfully');
            }
            else{
                alert('Failed to upload image');
            }
        }
        catch(error){
            console.error(error);
            
        }
    }
    const [file,setFile] = useState('');
  return (
    <div>
      <form className='m-5' onSubmit={handleSubmit}>
<input type="file" name="file" onChange={(e) => setFile(e.target.files?.[0])}/> <br />
<button type="submit">Upload</button>
      </form>
    </div>
  )
}

export default UploadMongoImage;

