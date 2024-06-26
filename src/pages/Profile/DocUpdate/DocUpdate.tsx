const DocUpdate = () => {
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      console.log(file);
      console.log('Uploading:', file.name);
    }
  };

  return (
    <div className="row mx-auto">
      <h3 className="ps-2 fs-2 text-danger my-4">Update your documents also</h3>
      <div className="col-md-4 mb-3">
        <div className="card">
          <div className="card-body text-bg-secondary">
            <label className="fs-2" htmlFor="image1">
              Image 1
            </label>
            <input
              type="file"
              className="form-control-file"
              id="image1"
              onChange={handleUpload}
            />
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="card">
          <div className="card-body text-bg-secondary">
            <label className="fs-2" htmlFor="image2">
              Image 2
            </label>
            <input
              type="file"
              className="form-control-file"
              id="image2"
              onChange={handleUpload}
            />
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-3">
        <div className="card">
          <div className="card-body text-bg-secondary">
            <label className="fs-2" htmlFor="image3">
              Image 3
            </label>
            <input
              type="file"
              className="form-control-file"
              id="image3"
              onChange={handleUpload}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocUpdate;
