import React, { useState } from "react";
import { StyleInputs,StyleContentImg,Styleli,StyleContent,StyleImg  } from "./index.tsx";

function App() {
  const button: string="Enviar";
  const buttons: string = "Actualizar";
  const [inputValue, setInputValue] = useState("");
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [edit, setEdit] = useState(button);
  const [editingIndex, setEditingIndex] = useState<number | null>(null); 

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const fetchImg = () => {

    if (inputValue === "") {
      alert("no se puede colocar una img vacia");
      return;
    } else {
    if (!imgUrls.includes(inputValue)) {
      setImgUrls(prevstate => [...prevstate, inputValue]);
      setInputValue("");
    } else {
      alert("no se puede colocar esa img porque ya se encuentra en la lista");
    }
  }
  };

  const deleteImg = (index: number) => {
    setImgUrls(prevstate => prevstate.filter((_, i) => i !== index));
  }

  const update = (index: number) => {
    setEdit(buttons);
    setInputValue(imgUrls[index]);
    setEditingIndex(index); 
  }

  const editImg = () => {
    if (inputValue === "") {
      alert("coloque una img para actualizar");
      return;
    }else {
      if (inputValue === imgUrls[editingIndex!]) {
        alert("no se puede colocar esa img porque es la misa que esta en la lista");
        return;
      }else {
    if (editingIndex !== null) {
      const newUrl = inputValue;
      if (newUrl !== undefined) {
        setImgUrls(prevstate => prevstate.map((url, i) => i === editingIndex ? newUrl : url));
      }
      setInputValue("");
      setEdit(button);
    }
  }
  }
  }

  return (
    <div>
      <StyleInputs>
        <input type="text" placeholder="Search.." value={inputValue} onChange={handleInputChange}></input>
        <button value={edit} onClick={edit === "Actualizar" ? editImg : fetchImg}>{edit}</button>
      </StyleInputs>
    <StyleContent>
      <StyleContentImg>
        {imgUrls.map((url, index) => (
          <div key={index}>
               <StyleImg>
            <img src={url} alt="img" /></StyleImg>
            <Styleli>
              <button type="submit" onClick={() => deleteImg(index)}> <li>eliminar</li></button>
              <button type="submit" onClick={() => update(index)}><li>editar</li></button>
            </Styleli>
          </div>
        ))}
      </StyleContentImg>
      </StyleContent>
    </div>
  );
}

export default App;