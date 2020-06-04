// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  base_url: 'https://leyendas-api.herokuapp.com',
  imageUploadUrl: 'https://api.cloudinary.com/v1_1/drs3muxpe/image/upload',
  imageStorageUrl: 'https://res.cloudinary.com/drs3muxpe/image/upload'
};
