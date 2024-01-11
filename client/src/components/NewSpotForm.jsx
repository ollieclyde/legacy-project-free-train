import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


function NewSpotForm(props) {
  let [name, setName] = useState("")
  let [description, setDescription] = useState("")
  let [files, setFiles] = useState([])
  let navigate = useNavigate()

  function updateName(e){
    setName(e.target.value)
  }

  function updateDescription(e){
    setDescription(e.target.value)
  }

  function updateFiles(file) {
    setFiles([...files, file[0]])
  }

  function validateAndSend(event) {
    event.preventDefault()
    if(name == "") {
      console.log("name empty")
      return
    } else if(description == "") {
      console.log("description is empty")
      return
    } else if (files.length == 0) {
      console.log("no images uploaded")
      return
    }
    const data = new FormData()
    data.append("name", name)
    data.append("description", description)
    data.append("lat", props.newSpotPosition.lat)
    data.append("lng", props.newSpotPosition.lng)
    data.append("author", props.user)
    let fileCount = 0
    for(let image of files) {
      data.append(`file${fileCount}`, image)
      fileCount++
    }
    axios.post("http://localhost:3000/spot/addSpot", data).then(res => {
      navigate("/mapScreen")
    })
  }

  return ( 
    <div id="new-spot-form">
      <Link to="/mapScreen" className="back-link">
        <button className="back-button"><IoArrowBackCircleOutline size="40"/></button>
      </Link>
      <h1>Add a spot</h1>
      <form onSubmit={validateAndSend}>
        <div className="formItem">
          <label htmlFor="name"> Give your spot a name</label>
          <input type="text" id="name" onChange={updateName} value={name}/>
        </div>
        <div className="formItem">
          <label htmlFor="description">Describe your spot</label>
          <textarea id="description" cols="30" rows="5" onChange={updateDescription} value={description}></textarea>
        </div>
        <div className="itemDiv"></div>
        <div className="imageUpload">
          <label htmlFor="uploadImage">Post some pictures</label>
          <input type="file" accept=".jpg,.png," id="uploadImage" onChange={(e) => updateFiles(e.target.files)}/>
          <div className="imageDisplay">
            {files.map(image => {return (<img key={image.url} src={URL.createObjectURL(image)} max-width="200px" min-width="100px" max-height="150px" min-height="100px"/>)})}
          </div>
        </div>
        <div className="itemDiv"></div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default NewSpotForm;