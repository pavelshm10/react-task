import { useState, useEffect } from "react";
import File from "./Components/File/File";
import "./App.css";
import { Files } from "./Types/file_enum";



function App() {
	const [files, setFiles] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);


	useEffect(() => {
		fetch(`https://mighty-sierra-05836.herokuapp.com/files`)
			.then((res) => res.json())
			.then((response) => {
				console.log(response);
				setFiles(response.files);
				setLoading(false);
			});
	}, []);

	return (
		<div className="App">
			{loading ? (
				<div>loading...</div>
			) : (
				files.map((file:Files) => (
					<div key="{file.name}">
						<File {...file} />
					</div>
				))
			)}
		</div>
	);
}
export default App;
