# -*- coding: utf-8 -*-
import os

from datetime import timedelta
import time
import cv2
from flask import Flask, render_template, request, jsonify

# 设置允许的文件格式
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'png', 'JPG', 'PNG', 'bmp', 'jpg'}

# et global variable
input_str = '../static/input/3.jpg'
output_str = '../static/input/2.jpg'
restore_str = '../static/input/1.jpg'
original_str = '../static/input/default.png'
posibility = ' '
base_path = os.path.dirname(__file__)  # 当前文件所在路径


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS


app = Flask(__name__)
# 设置静态文件缓存过期时间
app.send_file_max_age_default = timedelta(seconds=1)


@app.route('/', methods=['GET'])
def xx():
    return render_template('xx.html')

@app.route('/index', methods=['GET'])
def index():
    return render_template('demo4.html',
                           input_str=input_str,
                           output_str=output_str,
                           original_str=original_str,
                           restore_str=restore_str,
                           posibility=posibility)


@app.route('/submit', methods=['POST', 'GET'])
def submit():
    if request.method == 'POST':
        f = request.form.get('file')
        if not (f and allowed_file(f)):
            return jsonify({"error": 1001, 'msg': "请检查上传的图片类型，仅限于png、PNG、jpg、JPG、bmp"})
        upload_path = os.path.join(base_path, 'static/input', secure_filename(f))
        # only specified local file
        # 使用Opencv转换一下图片格式和名称
        img = cv2.imread(upload_path)
        cv2.imwrite(os.path.join(base_path, 'static/input', 'test.jpg'), img)

        global input_str
        input_str = '../static/input/test.jpg'
        return render_template('demo4.html',
                               input_str=input_str,
                               output_str=output_str,
                               restore_str=restore_str,
                               original_str=original_str,
                               posibility=posibility)


@app.route('/posibility', methods=['POST', 'GET'])
def getPosibility():
    if request.method == 'POST':
        t1 = time.time()
        os.system("python global_classifier.py"
                  " --input_path  static/input/test.jpg "
                  "--model_path weights/global.pth"
                  "> posibility")
        t2 = time.time()
        print("posibility:", t2-t1)
        with open('posibility', 'r') as f:
            global posibility
            posibility = f.read()[-7:-1]

    return render_template('demo4.html',
                           input_str=input_str,
                           output_str=output_str,
                           original_str=original_str,
                           restore_str=restore_str,
                           posibility=posibility)


@app.route('/check', methods=['POST', 'GET'])
def check():
    if request.method == 'POST':
        t3 = time.time()
        os.system("python local_detector.py"
                  " --input_path static/input/test.jpg "
                  "--model_path weights/local.pth"
                  " --dest_folder static/out/")
        t4 = time.time()
        print("Check", t4 -t3)
        global output_str
        output_str = '../static/out/heatmap.jpg'
        global restore_str
        restore_str = '../static/input/3.jpg'
    return render_template('demo4.html',
                           input_str=input_str,
                           output_str=output_str,
                           restore_str=restore_str,
                           original_str=original_str,
                           posibility=posibility)


@app.route('/restore', methods=['POST', 'GET'])
def restore():
    if request.method == 'POST':
        global restore_str
        restore_str = '../static/out/cropped_input.jpg'
    return render_template('demo4.html',
                           input_str=input_str,
                           output_str=output_str,
                           restore_str=restore_str,
                           original_str=original_str,
                           posibility=posibility)


if __name__ == '__main__':
    app.run(debug=True,  threaded=True)
