type TitlePageProps = React.ComponentProps<"h1">;

export default function TitleSection({ children, ...props }: TitlePageProps) {
	return (
		<h1
			className="text-secondary text-3xl font-semibold my-4 mx-auto"
			{...props}
		>
			{children}
		</h1>
	);
}
