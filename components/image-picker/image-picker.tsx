'use client'
import { useRef, useState } from 'react'

import classes from './image-picker.module.css'
import Image from 'next/image'

export const ImagePicker = ({ label, name }: { label: string; name: string }) => {
  const [pickedImage, setPickedImage] = useState<string | null>(null)
  const imageInput = useRef<HTMLInputElement>(null)

  function handlePickImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target?.files?.[0]

    if (!file) {
      setPickedImage(null)
      return
    }

    const fileReader = new FileReader()

    fileReader.onload = () => {
      setPickedImage(fileReader.result as string)
    }

    fileReader.readAsDataURL(file)
  }

  function handlePickClick() {
    imageInput.current?.click()
  }

  return <div className={classes.picker}>
    <label htmlFor={name}>{label}</label>
    <div className={classes.controls}>
      <div className={classes.preview}>
        {!pickedImage ? <p>Please pick an image</p> : <Image src={pickedImage} alt="Preview" fill />}
      </div>
      <input
        className={classes.input}
        type="file"
        id={name}
        name={name}
        accept="image/png, image/jpeg"
        ref={imageInput}
        onChange={handlePickImage}
        required
      />
      <button className={classes.button} type="button" onClick={handlePickClick}>
        Pick an image
      </button>
    </div>
  </div>
}
