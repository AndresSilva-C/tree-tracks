import { Link } from "react-router";

function About() {
	// JS here
	
	return (
		<div className="absolute top-0 left-0 w-screen h-screen overflow-hidden bg-cover bg-center
		bg-gradient-to-r from-green-500 from-10% via-emerald-500 via-30% to-sky-500 to-90%">
			<div>
				<h1 className="font-bold text-6xl text-start text-black font-serif p-10 tracking-wide">
                    TreeTracks
                </h1>
				<div className="text-start font-serif text-lg text-balance text-black ml-10">
					<p>
						This site is a fun, experimental, personal project made from scratch, mainly to make
						sure I don't forget how to code and practice new skills at the same time. 
						I wanted to combine my love for coding with my love for nature and trees!
					</p>
					<ul className="mt-8 list-disc list-inside">
						Tech stack used:
						<li>
							Node.js
						</li>
						<li>
							Express
						</li>
						<li>
							PostgreSQL
						</li>
						<li>
							React wrapped with Vite, and routing with react-router
						</li>
						<li>
							Tailwind CSS
						</li>
						<li>
							Python scripting and web scraping for obtaining some of the
							<Link to='/references' style={{color: "rgba(25, 206, 230, 1)"}}> data </Link>
						</li>
						<li>
							My own RESTful API
						</li>
						<li>
							External API integration: <a href="https://www.gbif.org/">GBIF</a> API for occurrence mapping
						</li>
					</ul>
					<h3 className="font-semibold text-xl text-start text-black font-serif pt-10">
						Authored by Andres Silva-Castellanos
					</h3>
					<Link to='/' style={{color: "rgba(15, 96, 107, 1)"}} className="absolute left-10 bottom-6">
						Home
					</Link>
					<Link to='/references' style={{color: "rgba(15, 96, 107, 1)"}} className="absolute right-10 bottom-6">
						Next: References
					</Link>
				</div>
			</div>
		</div>
	);
}
export default About;