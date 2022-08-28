module.exports = {
  './@(apps|libraries)/**/*.+(js|ts|tsx)': ['yarn lint:fix', 'yarn lint'],
  './@(apps|libraries)/**/*.{js,jsx,ts,tsx,json,css,scss,md}': ['yarn format:write', 'yarn format:check'],
}
