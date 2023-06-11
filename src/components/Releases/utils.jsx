export default function sortReleasesByRegion(releases) {
  const releasesByRegion = {};
  const sortedReleases = []

  if (releases) {
    for (const release of releases) {
      if (!releasesByRegion[release.region]) {
        releasesByRegion[release.region] = [];
      }
      releasesByRegion[release.region].push(release);
    }
    
    for (const region in releasesByRegion) {
      const releasesInRegion = releasesByRegion[region];
      sortedReleases.push({ region, releases: releasesInRegion });
    }
  }

  return sortedReleases
}