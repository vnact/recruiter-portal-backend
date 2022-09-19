module.exports = {
  './@(apps|libraries)/**/*.+(js|ts|tsx)': ['yarn lint:fix'],
  './@(apps|libraries)/**/*.{js,jsx,ts,tsx,json,css,scss,md}': ['yarn format:write'],
}
