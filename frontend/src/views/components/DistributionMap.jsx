
function DistributionMap({taxonKey}) {
	
	return (
		<div className="flex">
            {["0/0", "1/0"].map((tile) => (
                <div key={tile} className="relative">
                <img
                    className="block"
                    width={256}
                    height={256}
                    src={`https://tile.gbif.org/4326/omt/1/${tile}@1x.png?style=gbif-dark`}
                />
                <img
                    className="block absolute top-0 left-0"
                    width={256}
                    height={256}
                    src={`https://api.gbif.org/v2/map/occurrence/density/1/${tile}@1x.png?srs=EPSG:4326&bin=hex&hexPerTile=102&style=green-noborder.poly&country=US&taxonKey=${taxonKey}`}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src=`https://tile.gbif.org/4326/omt/1/${tile}@1x.png?style=gbif-dark`;
                    }}
                />
                </div>
            ))}
        </div>
	);
}
export default DistributionMap;