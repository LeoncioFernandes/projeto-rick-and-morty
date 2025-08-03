import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { createBrowserRouter, RouterProvider } from "react-router";
import Personagens from "./pages/personagens/Personagens.tsx";
import PersonagemDetalhes from "./pages/personagens/detalhes/PersonagensDetalhes.tsx";
import Episodios from "./pages/episodios/Episodios.tsx";
import EpisodioDetalhes from "./pages/episodios/detalhes/EpisodioDetalhes.tsx";
import Localizacoes from "./pages/localizacoes/Localizacoes.tsx";
import LocalizacaoDetalhes from "./pages/localizacoes/detalhes/LocalizacaoDetalhes.tsx";

const router = createBrowserRouter([
	{
		path: "",
		element: <App />,
		children: [
			{
				path: "personagens",
				element: <Personagens />,
			},
			{
				path: "personagens/:id",
				element: <PersonagemDetalhes />,
			},
			{
				path: "episodios",
				element: <Episodios />,
			},
			{
				path: "episodios/:id",
				element: <EpisodioDetalhes />,
			},
			{
				path: "localizacoes",
				element: <Localizacoes />,
			},
			{
				path: "localizacoes/:id",
				element: <LocalizacaoDetalhes />,
			},
		],
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
