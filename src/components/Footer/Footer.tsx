import { FaGithub } from "react-icons/fa";

export default function Footer() {
	return (
		<footer className="flex flex-col items-center bg-tertiary p-4 gap-4">
			<FaGithub className="text-2xl" />
			<p className="text-center">
				© 2025 Programação Web com Linguagem de Scripts
			</p>
		</footer>
	);
}
