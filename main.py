import werkzeug
werkzeug.cached_property = werkzeug.utils.cached_property
import flask
flask.helpers._endpoint_from_view_func = flask.scaffold._endpoint_from_view_func

from flask import Flask, request, send_from_directory, redirect, abort
from flask_cors import CORS, cross_origin
from flask_restplus import Api, Resource, fields
import os


import webbrowser

url = 'http://127.0.0.1:5000/'

chrome_path = 'open -a /Applications/Google\ Chrome.app %s'

webbrowser.get(chrome_path).open(url)



app = Flask(__name__, static_url_path='')

@app.before_request
def limit_remote_addr():
    if request.remote_addr != '127.0.0.1':
        abort(403)  # Forbidden

@app.route('/')
def main():
	return redirect("../frontend/navigator/index.html")


CORS(app)
api = Api(app = app,
			version = "1.0",
			title = "Aufstrecken App",
			description = "Aufstrecken im Fernunterricht",
		  	doc="/api/swagger/")


name_spaceGet = api.namespace('get', description='get a md file')
name_spaceSave = api.namespace('save', description='save a md file')
name_spaceDelete = api.namespace('delete', description='delete a file / folder')

@name_spaceGet.route("/<path:path>")
class MainClass5(Resource):
	@api.doc(responses={ 200: 'OK', 400: 'Invalid Argument'},
			 params={'path': {'description': 'path to the file', 'required': True}})
	def get(self, path):
		try:
			if (os.path.isfile(path)):
				f = open(path, "r")
				answer = f.read()
				f.close()
				return {"file": answer, "directory": 0}
			else:
				return {"file": 0, "directory": os.listdir(path=path)}
		except FileNotFoundError as e:
			return 400


@name_spaceSave.route("/<path:path>")
class MainClass1(Resource):
	@api.doc(responses={ 200: 'OK', 400: 'Invalid Argument', 500: 'Mapping Key Error' },
			 params={})
	def post(self, path):
		if (os.path.isdir(path)): return 400
		if not os.path.exists(os.path.dirname(path)):
			os.makedirs(os.path.dirname(path))

		f = open(path, 'w')
		f.write(request.form["file"])
		f.close()
		return 200


# @name_spaceDelete.route("/<path:path>")
# class MainClass1(Resource):
# 	@api.doc(responses={ 200: 'OK', 400: 'Invalid Argument', 500: 'Mapping Key Error' },
# 			 params={})
# 	def delete(self, path):
# 		path = "Files/" + path
# 		if (not os.path.exists(path)): return 400
#
# 		if (os.path.isdir(path)): shutil.rmtree(path)
# 		else: os.remove(path)
# 		return 200


# frontend
@app.route('/frontend/<path:path>')
def send_file_frontend(path):
	return send_from_directory('frontend', path)

@app.route('/Files/<path:path>')
def send_file(path):
	return send_from_directory('Files', path)


if __name__ == "__main__":
	print("startup------------------------------------------------------------------------------")
	app.run()
