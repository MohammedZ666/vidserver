import { useState } from "react";

const FileUpload = () => {
  const [isSeries, setSeries] = useState(false);
  const [data, setData] = useState({});
  const [video, setVideo] = useState(null);
  const captalize_first_word = (sentence) => {
    const word_list = sentence.split(" ");
    const cap_word_list = [];
    word_list.forEach((word, i) => {
      if (!word) return;
      let firstChar = word.charAt(0).toUpperCase();
      word = firstChar + word.substring(1).toLowerCase();
      cap_word_list.push(word);
    });
    return cap_word_list.join(" ");
  };
  const handleChange = (e) => {
    let temp = { ...data };
    switch (e.target.name) {
      case "name":
        temp.name = e.target.value;
        break;
      case "type":
        temp.type = e.target.value;
        if (temp.type === "series") setSeries(true);
        else setSeries(false);
        break;
      case "season":
        temp.season = e.target.value;
        break;
      case "episode":
        temp.episode = e.target.value;
        break;
      default:
        temp.file = e.target.files[0];
        const objUrl = URL.createObjectURL(temp.file);
        setVideo(objUrl);
        break;
    }
    setData(temp);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form_data = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "name") {
        form_data.append(key, captalize_first_word(data[key]));
        return;
      }
      form_data.append(key, data[key]);
    });
    try {
      let response = await fetch("/upload/file", {
        method: "POST",
        body: form_data,
      });
      if (response.status !== 200) console.log("Upload failed");
    } catch (error) {
      console.log("Upload failed");
    }
  };
  return (
    <div className="file-upload">
      <h3>Upload Files</h3>
      <hr />
      <div className="form">
        <video id="videoPlayer" width="30%" controls={true} src={video}>
          Sorry your browser does not support html video
        </video>

        <form onSubmit={handleSubmit}>
          <br />
          <br />
          <label htmlFor="type"> Type </label>
          <br />
          <select
            name="type"
            value={data.type}
            required
            onChange={handleChange}
          >
            <option value="none" selected disabled hidden>
              Select an Option
            </option>
            <option value="series">Series</option>
            <option value="movie">Movie</option>
          </select>
          <br />
          <br />
          <br />
          <label htmlFor="name"> Name </label> <br />
          <input
            name="name"
            value={data.name}
            type="text"
            required
            onChange={handleChange}
          />
          <br />
          <br /> <br />
          {isSeries && (
            <>
              <label htmlFor="season"> Season </label>
              <br />
              <input
                name="season"
                value={data.season}
                type="number"
                min="1"
                required
                onChange={handleChange}
              />
              <br />
              <br /> <br />
              <label htmlFor="episode"> Episode </label>
              <br />
              <input
                name="episode"
                value={data.episode}
                type="number"
                min="1"
                required
                onChange={handleChange}
              />
              <br />
              <br />
            </>
          )}
          {isSeries && <br />}
          <label htmlFor="file"> File </label> <br />
          <input name="file" type="file" required onChange={handleChange} />
          <br /> <br />
          <br />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};
export default FileUpload;
