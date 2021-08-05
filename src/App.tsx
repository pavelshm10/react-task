import React, { useState, useEffect } from "react";
import { MdPictureAsPdf, MdImage, MdVideocam } from "react-icons/md";
import Modal from "react-modal";
// import { Page, Document } from "react-pdf";

import "./App.css";

const customStyles = {
	overlay: {
		margin: "auto",
		width: "300px",
		height: "100px",
	},
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		// bottom: "auto",
		marginRight: "-50%",
		width: "400px",
		height: "490px",
		overlay: {
			background: "#FFFF00",
		},
		transform: "translate(-50%, -50%)",
	},
};

function App() {
	const [files, setFiles] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [currentFile, setCurrentFile] = React.useState("");
	const [url, setUrl] = React.useState("");
	const [numPages, setNumPages] = useState();
	const [pageNumber, setPageNumber] = useState(1);

	useEffect(() => {
		fetch(`https://mighty-sierra-05836.herokuapp.com/files`)
			.then((res) => res.json())
			.then((response) => {
				setFiles(response.files);
				setLoading(false);
			});
	}, []);

	function openModal(file: any) {
		setIsOpen(true);
		setCurrentFile(file.name);
		setUrl("https://mighty-sierra-05836.herokuapp.com/" + file.name);
		console.log("url ", url);
	}

	function afterOpenModal() {}

	function closeModal() {
		setIsOpen(false);
	}

	function onDocumentLoadSuccess({ numPages }: any) {
		setNumPages(numPages);
		setPageNumber(1);
	}

	return (
		<div className="App">
			{loading ? (
				<div>loading...</div>
			) : (
				files.map((file) => (
					<div>
						<button onClick={() => openModal(file)} className="App-file">
							<div className="App-icon">
								{file.name.includes("jpg") ? (
									<MdImage />
								) : file.name.includes("pdf") ? (
									<MdPictureAsPdf />
								) : file.name.includes("mp4") ? (
									<MdVideocam />
								) : (
									""
								)}
							</div>
							<div className="App-fields">		
								<b>{file.name}</b>
								{file.name.includes("jpg") ? (
									<div className="type">
										{file.width}X{file.height}px
									</div>
								) : file.name.includes("pdf") ? (
									<div className="type">{file.pages} pages</div>
								) : file.name.includes("mp4") ? (
									<div className="type">{file.length} seconds</div>
								) : (
									""
								)}
							</div>
							<div className="App-size">{file.size.toLocaleString()}kB</div>
						</button>

						<Modal
							isOpen={modalIsOpen}
							style={customStyles}
							onAfterOpen={afterOpenModal}
							ariaHideApp={false}
						>
							<div className="file-header">
								<b className="file-name">{currentFile}</b>
								<button className="close-button" onClick={closeModal}>x</button>
							</div>

							<div className="file">
								{/* <iframe className="file-style" src={url}></iframe> */}
								{currentFile.includes("jpg") ? (
									<img src={url} className="file-style" alt="file_image" />
								) : currentFile.includes("pdf") ? (
									<iframe
										className="file-style"
										src={url}
										title="file_style"
									></iframe>
								) : currentFile.includes("mp4") ? (
									<video className="file-style" controls>
										<source src={url} type="video/mp4" />
									</video>
								) : (
									""
								)}
							</div>
						</Modal>
					</div>
				))
			)}
		</div>
	);
}

// const Modal = () => (
// 	<div id="modal">
// 		<button onClick={closeModal}>close</button>
// 		<div>I am a modal</div>
// 	</div>
// );
export default App;
