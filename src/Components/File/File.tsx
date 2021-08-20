import React, { useState } from "react";
import { MdPictureAsPdf, MdImage, MdVideocam } from "react-icons/md";
import DialogModal from "../Modal/modal";
import "../File/File.css";

function File(props: any) {
	const childRef = React.useRef();
	const [isModal, setIsModal] = useState(props.data);
	const handleOnClick = () => {
		if (childRef.current) {
			childRef.current?.openModal();
			props.onClick(true);
		}
	};
	const onOpenModal = (data:any) => {
		setIsModal(data);
		props.onClick(false);
    }
	return (
		<div className="file">
			<button onClick={handleOnClick} className="App-file">
				<div className="App-icon">
					{props.file.name?.includes("jpg") ? (
						<MdImage />
					) : props.file.name?.includes("pdf") ? (
						<MdPictureAsPdf />
					) : props.file.name?.includes("mp4") ? (
						<MdVideocam />
					) : (
						""
					)}
				</div>
				<div className="App-fields">
					<b>{props.file.name}</b>
					{props.file.name?.includes("jpg") ? (
						<div className="App-type">
							{props.file.width}X{props.file.height}px
						</div>
					) : props.file.name?.includes("pdf") ? (
						<div className="App-type">{props.file.pages} pages</div>
					) : props.file.name?.includes("mp4") ? (
						<div className="App-type">{props.file.length} seconds</div>
					) : (
						""
					)}
				</div>
				<div className="App-size">{props.file.size.toLocaleString()}kB</div>
			</button>
			<DialogModal file={props.file} data={isModal} ref={childRef} onClick={(e:any) => { onOpenModal(e) }}/>
		</div>
	);
}

export default File;
