import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Next Weather App",
	description: "Next Weather App 5 day forecast 3 hour increments",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<title>{metadata.title}</title>
				<meta name="description" content={metadata.description} />
				<meta charSet="utf-8" />
				<link
					href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
