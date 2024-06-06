PATH=$PATH:./node_modules/.bin

generate:
	export PATH=$PATH:./node_modules/.bin \
	tree-sitter generate

parse:
	export PATH=$PATH:./node_modules/.bin \
	tree-sitter parse example-file
