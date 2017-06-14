import fs from 'fs';
import path from 'path';
import { graphql, buildSchema }  from 'graphql';
import { introspectionQuery } from 'graphql/utilities';
const Schema = buildSchema(String(
  fs.readFileSync(path.join(__dirname, './schema.graphqls'))
));

// Save JSON of full schema introspection for Babel Relay Plugin to use
(async () => {
  const result = await (graphql(Schema, introspectionQuery));
  if (result.errors) {
    console.error(
      'ERROR introspecting schema: ',
      JSON.stringify(result.errors, null, 2)
    );
  } else {
    fs.writeFileSync(
      path.join(__dirname, './schema.json'),
      JSON.stringify(result, null, 2)
    );
  }
})();
