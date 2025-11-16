# PCF (Power Apps Component Framework)

## Development Custom Controls

### Environment

- NodeJS
- NPM
- Power Platform CLI
- MSBuild for .NET Framework

Run:
```sh
node -v
npm -v
pac -v
msbuild -v
```

Tip: Use Developer Command Prompt for VS 2022

### Create project

(Create a new directory)

Run:
```sh
pac pcf init --namespace {pcfnamespace} --name {pcfname} --template {field or dataset}
```

These files will be generated:

- `.eslintrc.json` (configs to TypeScript)
- `.gitignore`
- `package.json`
- `foldername.pcfproj`
- `pcfconfig.json`
- `tsconfig.json`
- `pcfname` (folder)
	- `ControlManifest.Input.xml` (defines component version/inputs/outputs)
	- `index.ts` (component codes)
	- `generated` (folder)
		- `ManifestTypes.d.ts` (component inputs/outputs codes)

### Install project

Run:
```sh
npm install
```

These files will be generated:

- `node_modules`
- `package-lock.json`

### Implement component

File: `pcfname/index.ts`
Functions: `init`, `updateView`, `getOutputs`, `destroy`

Example:
```typescript
container.appendChild(document.createTextNode("Hello World!"));
```

### Build project

Run:
```sh
npm run build
```

These files will be generated:

- `out/controls/pcfname`
	- `bundle.js`
	- `ControlManifest.xml`

### Test your component locally

Run:
```sh
npm start
```

### Create solution

#### Create a directory with solution's name

Example: `SolutionName`
Note: This name will be the name of the solution

#### Run into solution directory

Run:
```sh
pac solution init --publisher-name {publishername} --publisher-prefix {prefix}
```

These files will be generated:

- `SolutionName/`
	- `obj/`
	- `src/Other/`
		- `Customizations.xml`
		- `Relationships.xml`
		- `Solution.xml` (define solution version)
	- `.gitignore`
	- `SolutionName.cdsproj`

### Add reference to component

Run:
```sh
pac solution add-reference --path C:\PCF\pcfname
```

### Export solution

Run:
```sh
msbuild /t:build /restore
```

The `.zip` file will be generated:

- `SolutionName/`
	- `bin/Debug/SolutionName.zip`

### Import with solution

- Import the solution `.zip` file into your DEV environment
- Publish all customizations

### Import without solution

#### Connect to your environment

Run:
```sh
pac auth create --url https://environmenturl.crm.dynamics.com/
```

#### Deploy component

Run:
```sh
pac pcf push --publisher-prefix <publisher prefix>
```

(This will deploy the component and publish all customizations)

### Update an existing component

- Change TS files
- Increment the component version (file: `{ComponentName}/ControlManifest.Input.xml`)
- Increment the solution version (file: `{SolutionName}/src/Other/Solution.xml`)
- Rebuild the solution
	Run:
	```sh
	msbuild /t:build /restore (in solution directory)
	```
- Import the new solution `.zip` file into your environment
- Publish all customizations

### Resources

Link: [https://carldesouza.com/pcf/](https://carldesouza.com/pcf/)
