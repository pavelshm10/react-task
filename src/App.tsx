import { useState, useEffect } from "react";
import File from "./Components/File/File";
import "./App.css";
import { Files } from "./Types/file_enum";

function App() {
	const [files, setFiles] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [isModal, setIsModal] = useState(false);
	const [error, setError] = useState(null);
	const onClick = (data: any) => {
		setIsModal(data);
		const body = document.getElementsByClassName("App")[0] as HTMLElement;
		//style body on opening modal
		if (data) {
			body.style.opacity = "0.5";
			body.style.backgroundColor = "#add8e6";
			body.style.boxShadow = "0 0 0 100vmax rgba(0, 0, 0, 0.3)";
			body.style.pointerEvents = "none";
		} else {
			body.style.opacity = "1";
			body.style.backgroundColor = "none";
			body.style.boxShadow = "none";
			body.style.pointerEvents = "auto";
		}
	};
	useEffect(() => {
		setTimeout(() => {
		fetch(`https://mighty-sierra-05836.herokuapp.com/files`)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					throw Error("could not fetch the data for that resource");
				}
			})
			.then((response: any) => {
				setFiles(response.files);
				setLoading(false);
				setError(null);
			})
			.catch((err: any) => {
				console.log(err.message)
				setLoading(false);
				setError(err.message);
			});
		}, 1000);
	}, []);
	return (
		<div className="App">
			{error && <div>{error}</div>}
			{loading ? (
				<div>loading...</div>
			) : (
				files.map((file: Files, i: number) => (
					<div className="file" key={i}>
						<File
							data={isModal}
							file={file}
							onClick={(e: any) => {
								onClick(e);
							}}
						/>
					</div>
				))
			)}
		</div>
	);
}
export default App;
