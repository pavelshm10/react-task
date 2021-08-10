import { forwardRef, useImperativeHandle, useState } from "react";
import Modal from "react-modal";

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

const DialogModal = forwardRef((file: any, ref) => {
	const [modalIsOpen, setIsOpen] = useState(false);
	const [currentFile, setCurrentFile] = useState("");
	const [url, setUrl] = useState("");
	useImperativeHandle(ref, () => ({
		openModal() {
			setIsOpen(true);
			setIsOpen(true);
			setCurrentFile(file.name);
			setUrl("https://mighty-sierra-05836.herokuapp.com/" + file.name);
			setIsOpen(true);
		},
	}));

	function closeModal() {
		setIsOpen(false);
	}
	return (
		<Modal isOpen={modalIsOpen} style={customStyles} ariaHideApp={false}>
			<div className="file-header">
				<b className="file-name">{currentFile}</b>
				<button className="close-button" onClick={closeModal}>
					x
				</button>
			</div>

			<div className="file">
				{currentFile.includes("jpg") ? (
					<img src={url} className="file-style" alt="file_image" />
				) : currentFile.includes("pdf") ? (
					<iframe className="file-style" src={url} title="file_style"></iframe>
				) : currentFile.includes("mp4") ? (
					<video className="file-style" controls>
						<source src={url} type="video/mp4" />
					</video>
				) : (
					""
				)}
			</div>
		</Modal>
	);
});

export default DialogModal;
