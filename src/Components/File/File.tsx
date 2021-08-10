import React from "react";
import { MdPictureAsPdf, MdImage, MdVideocam } from "react-icons/md";
import { Files } from "../../Types/file_enum";
import DialogModal from "../Modal/modal";

function File(file: Files) {
	const childRef = React.useRef();
	const handleOnClick = () => {
		if (childRef.current) {
			childRef.current?.openModal();
		}
	};
	return (
		<div>
			<button onClick={handleOnClick} className="App-file">
				<div className="App-icon">
					{file.name?.includes("jpg") ? (
						<MdImage />
					) : file.name?.includes("pdf") ? (
						<MdPictureAsPdf />
					) : file.name?.includes("mp4") ? (
						<MdVideocam />
					) : (
						""
					)}
				</div>
				<div className="App-fields">
					<b>{file.name}</b>
					{file.name?.includes("jpg") ? (
						<div className="type">
							{file.width}X{file.height}px
						</div>
					) : file.name?.includes("pdf") ? (
						<div className="type">{file.pages} pages</div>
					) : file.name?.includes("mp4") ? (
						<div className="type">{file.length} seconds</div>
					) : (
						""
					)}
				</div>
				<div className="App-size">{file.size.toLocaleString()}kB</div>
			</button>
			<DialogModal {...file} ref={childRef} />
		</div>
	);
}

export default File;
