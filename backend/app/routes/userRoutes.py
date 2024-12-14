from flask import Blueprint

userRoutes = Blueprint('user_routes',__name__)

@userRoutes.route('/')
def home():
    return "Hello from flask"

@userRoutes.route('/getHello')
def getHello():
    return "Hello from different url"
