import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { twMerge } from "tailwind-merge";

interface PaginacaoProps {
	setFirstPage(): void;
	setLastPage(totalPages: number | undefined): void;
	previousPage(): void;
	nextPage(totalPages: number | undefined): void;
	currentPage: number;
	lastPage: number | undefined;
}

export default function Paginacao({
	currentPage,
	lastPage,
	setFirstPage,
	setLastPage,
	previousPage,
	nextPage,
}: PaginacaoProps) {
	return (
		<div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-8 mt-8 mb-4 text-secondary">
			<Button disabled={currentPage === 1} onClick={setFirstPage}>
				Primeira Página
			</Button>
			<div className="flex items-center gap-2">
				<Button
					disabled={currentPage === 1}
					onClick={previousPage}
					classNamePersonal="text-2xl"
				>
					<IoIosArrowBack />
				</Button>
				<div className="font-bold">
					Página {currentPage} de {lastPage}
				</div>
				<Button
					disabled={currentPage === lastPage}
					onClick={() => nextPage(lastPage)}
					classNamePersonal="text-2xl"
				>
					<IoIosArrowForward />
				</Button>
			</div>
			<Button
				disabled={currentPage === lastPage}
				onClick={() => setLastPage(lastPage)}
			>
				Última Página
			</Button>
		</div>
	);
}

function Button({
	children,
	classNamePersonal,
	...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
	classNamePersonal?: string;
}) {
	return (
		<button
			className={twMerge(
				"border border-secondary py-2 px-3 rounded-lg cursor-pointer",
				"enabled:hover:bg-secondary/20 enabled:hover:font-semibold transition",
				"disabled:text-tertiary-3 disabled:border-tertiary-3 disabled:cursor-no-drop",
				classNamePersonal
			)}
			{...props}
		>
			{children}
		</button>
	);
}
