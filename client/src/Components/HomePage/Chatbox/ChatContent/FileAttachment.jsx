import "./FileAttachment.scoped.css";

function FileAttachment({ fileData }) {
  return (
    <div className="file-attachment-container">
      <i class="fa-solid fa-file-pdf" aria-hidden="true"></i>
      <div className="text-file-data">
        <a
          href="/assets/Vosyn-Company-Services.pdf"
          target="_blank"
          className="file-name-text"
        >
          {fileData.fileName}
        </a>
        <span className="file-size-text">{fileData.fileSize}</span>
      </div>
    </div>
  );
}

export default FileAttachment;
