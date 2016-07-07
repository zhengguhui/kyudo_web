sudo pip install uwsgi
sudo pip install pyyaml
sudo pip install markdown
sudo pip install PIL
sudo apt-get install libxml2-dev libxslt1-dev python-dev
sudo apt-get install python-dateutil python-docutils python-feedparser python-gdata python-jinja2 python-ldap python-libxslt1 python-lxml python-mako python-mock python-openid python-psycopg2 python-psutil python-pybabel python-pychart python-pydot python-pyparsing python-reportlab python-simplejson python-tz python-unittest2 python-vatnumber python-vobject python-webdav python-werkzeug python-xlwt python-yaml python-zsi
sudo pip install pyquery
python manage.py makemigrations qauthority
python manage.py makemigrations qblog
python manage.py makemigrations qfile
python manage.py makemigrations qvideo
python manage.py sqlmigrate qauthority 0001
python manage.py sqlmigrate qblog 0001
python manage.py sqlmigrate qfile 0001
python manage.py sqlmigrate qvideo 0001
python manage.py migrate
