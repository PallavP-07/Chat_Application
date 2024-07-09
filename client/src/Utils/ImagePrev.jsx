import React, { useRef, useState } from "react";
import ContactEmergencyIcon from "@mui/icons-material/ContactEmergency";
const ImagePrev = () => {
  const [image, setImage] = useState("");

  //ref used for input tag refer to parent div for use as input
//   const imageRef = useRef(null);

//   const handlerClickImage = () => {
//     imageRef.current.click();
//   };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  return (
    <>
      {/* <div onClick={handlerClickImage}>
        {image ? (
          <img src={URL.createObjectURL(image)} alt="" />
        ) : (
          <div>
            <ContactEmergencyIcon />
            <input
              type="file"
              accept="image/*"
              ref={imageRef}
              onChange={handleImageChange}
            />
          </div>
        )}
      </div> */}
        <div>
        {image ? (
          <img src={URL.createObjectURL(image)} alt="" />
        ) : (
          <div>
            <ContactEmergencyIcon />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ImagePrev;
