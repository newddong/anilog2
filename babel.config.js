module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [[
		'module-resolver',{
			'root':["."],
			'alias':{
				"Root":"./src",
				"Screens":"./src/screens",
				"Asset":"./asset",
				"Navigation":"./src/navigation",
				"Component":"./src/component",
				"Atom":"./src/component/atom",
				"Molecules":"./src/component/molecules",
				"Organism":"./src/component/organism",
				"Templete":"./src/component/templete",
			}
		}
	]],
};
