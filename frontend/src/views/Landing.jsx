import Button from './components/Button';

function Landing() {
	// JS goes here
	
	return (
		<div className="absolute top-0 left-0 w-screen h-screen overflow-hidden bg-cover bg-center
        bg-[url(https://upload.wikimedia.org/wikipedia/commons/2/29/Spring-sunshine-walking-trail_-_West_Virginia_-_ForestWander.jpg)]">
            <div className='bg-center bg-black/70 w-1/2 place-self-center p-18 mt-20 rounded-lg'>
                <h1 className="font-bold text-6xl text-center text-green-600 font-serif p-10 tracking-wide">
                    TreeTracks
                </h1>
                <p className='text-md text-center text-green-200 font-serif'>
                    Browse, search, and save your favorite US trees all in one place.
                </p>
                <div className="grid grid-cols-2 justify-items-center mt-10">
                    <Button text='Browse Trees' route='/browse' />
                    <Button text='Log In' route='/login' />
                </div>
            </div>
        </div>
	);
}
export default Landing;