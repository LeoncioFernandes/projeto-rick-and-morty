import { twMerge } from "tailwind-merge";

export default function IsLoadingElement({
	className,
}: {
	className?: string;
}) {
	return (
		<div
			className={twMerge(
				"w-full grow blur-lg mt-4 bg-[length:200%]",
				"bg-[linear-gradient(-60deg,_white_40%,_var(--color-secondary-variation)_,_white_60%)]",
				"animate-[loading_0.7s_linear_infinite]",
				className
			)}
		/>
	);
}
