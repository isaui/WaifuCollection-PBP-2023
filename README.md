1. 
A.	Untuk membuat sebuah proyek Django yang baru. Kita bisa memulai baik dengan menggunakan virtual environment ataupun tidak menggunakan virtual environment. Apabila kita menggunakan virtual environment, maka step yang perlu kita lakukan adalah sebagai berikut:

a.	Buat virtual environment python. Apabila belum menginstal virtual environment, maka bisa menginstallnya terlebih dahulu dengan menuliskan “pip install virtualenv” di terminal device Anda. Kemudian tulis “python -m virtualenv (nama virtualenv yang ingin dibuat)” di terminal device Anda. Dalam hal ini nama virtualenv saya adalah sepuhvirtual.
b.	Setelah itu, pada direktori yang sama, Anda perlu mengaktifkan virtualenv tersebut dengan menuliskan “(nama virtualenv yang tadi Anda buat)\Scripts\activate”, berarti saya perlu melakukan “sepuhvirtual\Scripts\activate”.
c.	Kemudian install django dengan menuliskan “pip install django”.
d.	Buat projek django dengan menuliskan “django-admin startproject (nama project Anda)”. Dalam hal ini projek yang saya buat adalah WaifuCollection.

B.	Untuk membuat app pada proyek Django tersebut caranya adalah sebagai berikut:

a.	Pindah dulu ke directory projek tersebut. Dalam hal ini dengan mengasumsikan Anda berada pada directory yang sama sebelumnya, maka Anda perlu menuliskan “cd (nama projek anda)”, dalam hal ini saya berarti menuliskan “cd WaifuCollection”.
b.	Kemudian, buat sebuah app di projek tersebut dengan menuliskan “django-admin startapp (nama app Anda)”. Dalam hal ini, saya memilih menggunakan nama aplikasi saya adalah main. Kemudian buka folder projek Anda tersebut di VSCode Anda.
C.	Untuk melakukan routing pada aplikasi main tersebut agar dapat diakses di project Django, caranya adalah sebagai berikut:

a.	Navigasi ke settings.py pada directory projek, dalam hal ini directory tersebut WaifuCollection yang berada di dalam root projek WaifuCollection. 
b.	Pada settings.py, daftarkan aplikasi Anda, dalam hal ini aplikasi saya adalah main. Caranya adalah dengan menambahkan “main” pada  INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
   'django.contrib.sessions',
   'django.contrib.messages',
   'django.contrib.staticfiles',
   'main' ]
c.	Kemudian, konfigurasikan aplikasi main pada urls.py di tingkat proyek. Caranya adalah dengan menambahkan  path('/', include('main.urls'))  pada 
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main.urls'))
]
Tujuan melakukan hal tersebut adalah untuk menetapkan  rute dasar untuk aplikasi main.

D.	Kemudian, kita perlu membuat model Item (terserah Anda memilih membuat model apa). Model bisa diibaratkan sebagai representasi Python dari tabel dalam basis data yang mendefinisikan struktur data dan aturan yang diterapkan pada data dalam aplikasi web Django. Dalam hal ini untuk membuatnya, Anda perlu navigasi ke models.py yang berada di directory aplikasi yang anda pilih, dalam hal ini saya memilih aplikasi main. Setelah itu, anda bisa menambahkan kelas model Item yang melakukan inheritance terhadap kelas models.model. Contohnya adalah seperti ini:

class Item(models.Model):
    name= models.CharField(max_length=255)
    amount= models.IntegerField(validators=[MinValueValidator(0)])
    description=models.TextField()
    strength = models.PositiveIntegerField()
    speed = models.PositiveIntegerField() 
    potential = models.PositiveIntegerField() 
    intelligence = models.PositiveIntegerField() 
    endurance = models.PositiveIntegerField() 
    height = models.DecimalField(max_digits=5, decimal_places=2)
    weight = models.DecimalField(max_digits=5, decimal_places=2)
Kemudian register model yang Anda buat ke admin. Caranya adalah:
from django.contrib import admin
from .models import Item

# Register your models here.
admin.site.register(Item)
Setiap kali Anda selesai mengedit atau membuat models, Anda perlu melakukan hal ini pada directory root project di terminal Anda:
	python manage.py makemigrations
	python manage.py migrate
untuk memperbarui state pada database di django.

E.	Untuk membuat sebuah fungsi pada views.py, Anda perlu navigasi ke views.py pada directory yang sama. Setelah itu buat sebuah fungsi sebagai contoh:

from django.shortcuts import render
from .models import WaifuStatsCard

# Create your views here.
def home(request):
    waifu = Item(
        name="Keqing",
        amount=10,  # Jumlah, pastikan >= 0
        description="Cakep Banget Sumpah Maukah Keqing jadi Istriku?",
        strength=80,
        speed=90,
        potential=85,
        intelligence=75,
        endurance=70,
        height=160.5,  # Tinggi dalam cm
        weight=48.5    # Berat dalam kg
    )
    return render(request, "home.html", {'data': waifu})

Sederhananya fungsi pada views berguna untuk meng-handle url yang dikunjungi oleh pengguna di browser. Url yang tepat akan memanggil fungsi yang tepat pada views.py. 
F.	Agar dapat memanggil fungsi yang tepat untuk setiap permintaan url, maka kita perlu melakukan konfigurasi pada urls.py pada tingkat app, dalam hal ini file urls.py pada aplikasi yang sedang Anda kerjakan, untuk saya yaitu aplikasi main. 
Contohnya seperti ini:

from django.urls import path

from . import views

urlpatterns = [

    path('', views.home, name='home'),  # menambahkan fungsi home untuk handle path url “{urldasar}/”

  ]
G.	Membuat Template. Template adalah file yang berisi markup HTML dan kode template yang digunakan untuk menghasilkan halaman web dinamis dengan menggabungkan data dari server atau sumber data lainnya dengan tampilan HTML yang telah ditentukan sebelumnya. Pada views.home sebelumnya, yaitu
 def home(request):
    waifu = Item(
        name="Keqing",
        amount=10,  # Jumlah, pastikan >= 0
        description="Cakep Banget Sumpah Maukah Keqing jadi Istriku?",
        strength=80,
        speed=90,
        potential=85,
        intelligence=75,
        endurance=70,
        height=160.5,  # Tinggi dalam cm
        weight=48.5    # Berat dalam kg
    )
    return render(request, "home.html", {'data': waifu})

home.html adalah salah satu contoh template. Cara membuatnya adalah Anda perlu membuat sebuah folder bernama templates di direktori yang sama dengan folder views tersebut, kemudian di dalam folder templates, Anda bisa menambahkan file html bernama home.html.

Bagi saya, kode home.html adalah sebagai berikut:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Waifu Card</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="container mx-auto mt-8">
        <!-- Card Container -->
        <div class="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <!-- Card Header -->
            <div class="bg-gradient-to-r from-purple-400 to-pink-500 p-4">
                <h1 class="text-2xl font-semibold text-white">Waifu Card</h1>
            </div>
            <!-- Card Body -->
            <div class="p-4">
                <!-- Waifu Name -->
                <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ data.name }}</h2>
                <!-- Waifu Description -->
                <p class="text-gray-600">{{ data.description }}</p>
                <!-- Waifu Stats -->
                <div class="mt-4">
                    <h3 class="text-lg font-semibold text-gray-800">Stats:</h3>
                    <ul class="list-disc list-inside text-gray-600">
                        <li>Strength: {{ data.strength }}</li>
                        <li>Speed: {{ data.speed }}</li>
                        <li>Potential: {{ data.potential }}</li>
                        <li>Intelligence: {{ data.intelligence }}</li>
                        <li>Endurance: {{ data.endurance }}</li>
                    </ul>
                </div>
                <!-- Waifu Physical Attributes -->
                <div class="mt-4">
                    <h3 class="text-lg font-semibold text-gray-800">Physical Attributes:</h3>
                    <ul class="list-disc list-inside text-gray-600">
                        <li>Height: {{ data.height }} cm</li>
                        <li>Weight: {{ data.weight }} kg</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

H.	Langkah terakhir adalah melakukan deployment ke platform hosting, misal Adaptable.io . Akan tetapi, sebelum Anda melakukannya, Anda perlu melakukan navigasi ke settings.py pada directory tingkat project Anda. Lalu pastikan line ini: 
ALLOWED_HOSTS = ["*"]
Hal tersebut berguna agar django mengizinkan domain atau host mana yang diizinkan untuk mengakses aplikasi Anda setelah Anda mendeploynya ke internet. “*” artinya apapun itu boleh. Silahkan deploy ke platform kesukaan Anda.

2.  1. 
A.	Untuk membuat sebuah proyek Django yang baru. Kita bisa memulai baik dengan menggunakan virtual environment ataupun tidak menggunakan virtual environment. Apabila kita menggunakan virtual environment, maka step yang perlu kita lakukan adalah sebagai berikut:

a.	Buat virtual environment python. Apabila belum menginstal virtual environment, maka bisa menginstallnya terlebih dahulu dengan menuliskan “pip install virtualenv” di terminal device Anda. Kemudian tulis “python -m virtualenv (nama virtualenv yang ingin dibuat)” di terminal device Anda. Dalam hal ini nama virtualenv saya adalah sepuhvirtual.
b.	Setelah itu, pada direktori yang sama, Anda perlu mengaktifkan virtualenv tersebut dengan menuliskan “(nama virtualenv yang tadi Anda buat)\Scripts\activate”, berarti saya perlu melakukan “sepuhvirtual\Scripts\activate”.
c.	Kemudian install django dengan menuliskan “pip install django”.
d.	Buat projek django dengan menuliskan “django-admin startproject (nama project Anda)”. Dalam hal ini projek yang saya buat adalah WaifuCollection.

B.	Untuk membuat app pada proyek Django tersebut caranya adalah sebagai berikut:

a.	Pindah dulu ke directory projek tersebut. Dalam hal ini dengan mengasumsikan Anda berada pada directory yang sama sebelumnya, maka Anda perlu menuliskan “cd (nama projek anda)”, dalam hal ini saya berarti menuliskan “cd WaifuCollection”.
b.	Kemudian, buat sebuah app di projek tersebut dengan menuliskan “django-admin startapp (nama app Anda)”. Dalam hal ini, saya memilih menggunakan nama aplikasi saya adalah main. Kemudian buka folder projek Anda tersebut di VSCode Anda.
C.	Untuk melakukan routing pada aplikasi main tersebut agar dapat diakses di project Django, caranya adalah sebagai berikut:

a.	Navigasi ke settings.py pada directory projek, dalam hal ini directory tersebut WaifuCollection yang berada di dalam root projek WaifuCollection. 
b.	Pada settings.py, daftarkan aplikasi Anda, dalam hal ini aplikasi saya adalah main. Caranya adalah dengan menambahkan “main” pada  INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
   'django.contrib.sessions',
   'django.contrib.messages',
   'django.contrib.staticfiles',
   'main' ]
c.	Kemudian, konfigurasikan aplikasi main pada urls.py di tingkat proyek. Caranya adalah dengan menambahkan  path('/', include('main.urls'))  pada 
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main.urls'))
]
Tujuan melakukan hal tersebut adalah untuk menetapkan  rute dasar untuk aplikasi main.

D.	Kemudian, kita perlu membuat model Item (terserah Anda memilih membuat model apa). Model bisa diibaratkan sebagai representasi Python dari tabel dalam basis data yang mendefinisikan struktur data dan aturan yang diterapkan pada data dalam aplikasi web Django. Dalam hal ini untuk membuatnya, Anda perlu navigasi ke models.py yang berada di directory aplikasi yang anda pilih, dalam hal ini saya memilih aplikasi main. Setelah itu, anda bisa menambahkan kelas model Item yang melakukan inheritance terhadap kelas models.model. Contohnya adalah seperti ini:

class Item(models.Model):
    name= models.CharField(max_length=255)
    amount= models.IntegerField(validators=[MinValueValidator(0)])
    description=models.TextField()
    strength = models.PositiveIntegerField()
    speed = models.PositiveIntegerField() 
    potential = models.PositiveIntegerField() 
    intelligence = models.PositiveIntegerField() 
    endurance = models.PositiveIntegerField() 
    height = models.DecimalField(max_digits=5, decimal_places=2)
    weight = models.DecimalField(max_digits=5, decimal_places=2)
Kemudian register model yang Anda buat ke admin. Caranya adalah:
from django.contrib import admin
from .models import Item

# Register your models here.
admin.site.register(Item)
Setiap kali Anda selesai mengedit atau membuat models, Anda perlu melakukan hal ini pada directory root project di terminal Anda:
	python manage.py makemigrations
	python manage.py migrate
untuk memperbarui state pada database di django.

E.	Untuk membuat sebuah fungsi pada views.py, Anda perlu navigasi ke views.py pada directory yang sama. Setelah itu buat sebuah fungsi sebagai contoh:

from django.shortcuts import render
from .models import WaifuStatsCard

# Create your views here.
def home(request):
    waifu = Item(
        name="Keqing",
        amount=10,  # Jumlah, pastikan >= 0
        description="Cakep Banget Sumpah Maukah Keqing jadi Istriku?",
        strength=80,
        speed=90,
        potential=85,
        intelligence=75,
        endurance=70,
        height=160.5,  # Tinggi dalam cm
        weight=48.5    # Berat dalam kg
    )
    return render(request, "home.html", {'data': waifu})

Sederhananya fungsi pada views berguna untuk meng-handle url yang dikunjungi oleh pengguna di browser. Url yang tepat akan memanggil fungsi yang tepat pada views.py. 
F.	Agar dapat memanggil fungsi yang tepat untuk setiap permintaan url, maka kita perlu melakukan konfigurasi pada urls.py pada tingkat app, dalam hal ini file urls.py pada aplikasi yang sedang Anda kerjakan, untuk saya yaitu aplikasi main. 
Contohnya seperti ini:

from django.urls import path

from . import views

urlpatterns = [

    path('', views.home, name='home'),  # menambahkan fungsi home untuk handle path url “{urldasar}/”

  ]
G.	Membuat Template. Template adalah file yang berisi markup HTML dan kode template yang digunakan untuk menghasilkan halaman web dinamis dengan menggabungkan data dari server atau sumber data lainnya dengan tampilan HTML yang telah ditentukan sebelumnya. Pada views.home sebelumnya, yaitu
 def home(request):
    waifu = Item(
        name="Keqing",
        amount=10,  # Jumlah, pastikan >= 0
        description="Cakep Banget Sumpah Maukah Keqing jadi Istriku?",
        strength=80,
        speed=90,
        potential=85,
        intelligence=75,
        endurance=70,
        height=160.5,  # Tinggi dalam cm
        weight=48.5    # Berat dalam kg
    )
    return render(request, "home.html", {'data': waifu})

home.html adalah salah satu contoh template. Cara membuatnya adalah Anda perlu membuat sebuah folder bernama templates di direktori yang sama dengan folder views tersebut, kemudian di dalam folder templates, Anda bisa menambahkan file html bernama home.html.

Bagi saya, kode home.html adalah sebagai berikut:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Waifu Card</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100">
    <div class="container mx-auto mt-8">
        <!-- Card Container -->
        <div class="max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            <!-- Card Header -->
            <div class="bg-gradient-to-r from-purple-400 to-pink-500 p-4">
                <h1 class="text-2xl font-semibold text-white">Waifu Card</h1>
            </div>
            <!-- Card Body -->
            <div class="p-4">
                <!-- Waifu Name -->
                <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ data.name }}</h2>
                <!-- Waifu Description -->
                <p class="text-gray-600">{{ data.description }}</p>
                <!-- Waifu Stats -->
                <div class="mt-4">
                    <h3 class="text-lg font-semibold text-gray-800">Stats:</h3>
                    <ul class="list-disc list-inside text-gray-600">
                        <li>Strength: {{ data.strength }}</li>
                        <li>Speed: {{ data.speed }}</li>
                        <li>Potential: {{ data.potential }}</li>
                        <li>Intelligence: {{ data.intelligence }}</li>
                        <li>Endurance: {{ data.endurance }}</li>
                    </ul>
                </div>
                <!-- Waifu Physical Attributes -->
                <div class="mt-4">
                    <h3 class="text-lg font-semibold text-gray-800">Physical Attributes:</h3>
                    <ul class="list-disc list-inside text-gray-600">
                        <li>Height: {{ data.height }} cm</li>
                        <li>Weight: {{ data.weight }} kg</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

H.	Langkah terakhir adalah melakukan deployment ke platform hosting, misal Adaptable.io . Akan tetapi, sebelum Anda melakukannya, Anda perlu melakukan navigasi ke settings.py pada directory tingkat project Anda. Lalu pastikan line ini: 
ALLOWED_HOSTS = ["*"]
Hal tersebut berguna agar django mengizinkan domain atau host mana yang diizinkan untuk mengakses aplikasi Anda setelah Anda mendeploynya ke internet. “*” artinya apapun itu boleh. Silahkan deploy ke platform kesukaan Anda.

2.
urls.py:
file urls.py adalah tempat untuk mendefinisikan rute untuk aplikasi pada projek django. Terdapat dua urls.py, yaitu urls.py yang berada di level projek dan urls.py yang berada di level aplikasi. urls.py yang berada di level projek berfungsi sebagai root yang digunakan untuk mendefinisikan rute tiap aplikasi atau dengan kata lain menghubungkan rute dasar dengan rute yang didefiniikan di urls.py yang berada di tingkat aplikasi. Sebagai contoh rute aplikasi admin memiliki awalan rute ‘/admin’, rute aplikasi main memiliki awalan rute ‘’, dan rute aplikasi chat memiliki awalan rute ‘/chat’ dan sebagainya.
File urls.py pada level aplikasi digunakan untuk menghubungkan rute spesifik untuk setiap aplikasi dengan fungsi views pada apliaksi tersebut yang sesuai. Rute pada aplikasi ini tentu saja mewarisi rute dasar yang sudah didefinisikan oleh file urls.py yang berada pada tingkat projek.
views.py:
File views.py berisi definisi fungsi-fungsi yang akan menangani permintaan klien. Pada file ini, kita dapat mengakses models dan memodifikasinya. Selain itu, kita juga dapat menentukan template yang harus dirender sesuai request tertentu.
models.py:

File models.py berisi definisi model atau struktur  untuk data pada aplikasi. Model juga merupakan representasi dari tabel di database dalam bentuk objek dan kelas di python. Model ini digunakan oleh views untuk mengambil, menyimpan, atau memanipulasi data dalam database.
Berkas HTML:
Berkas html pada django bisa dikatakan sebagai template yang berisi tampilan yang akan dikirimkan ke klien sebagai respons. Template HTML ini berisi markup dan sintaksis untuk menampilkan data dinamis yang diberikan oleh Views. Views menggunakan template ini untuk merender tampilan HTML yang akan dikirimkan ke klien sebagai respon.
Kaitan:
a.	Permintaan klien pertama kali mencocokkan URL yang dikirimkan ke urls.py.
b.	urls.py mengarahkan permintaan ke tampilan (views) yang sesuai.
c.	Fungsi di views.py menerima permintaan, berinteraksi dengan Model (jika perlu) untuk mengambil atau memanipulasi data, dan merender template HTML.
d.	Template HTML digunakan untuk merender tampilan akhir yang dikirimkan sebagai respons ke klien.

3. Kita perlu menggunakan virtual environment karena virtual environment memungkinkan kita untuk mengisolasi suatu proyek aplikasi. Dengan mengisolasinya, maka kita tidak perlu khawatir bahwa dependensi paket ataupun versi pada proyek tersebut akan saling bertentangan atau mempengaruhi proyek-proyek lainnya. Hal tersebut dapat mengatasi terjadinya resiko konflik antar proyek. Salah satu contohnya adalah kita dapat menggunakan versi django dan python yang berbeda pada projek yang berbeda.
Kita tetap dapat membuat projek django tanpa menggunakan virtual environment. Akan tetapi, resiko konflik dependensi akan mengintai projek kita. Hal tersebut karena apabila django pada projek kita berjalan pada versi x, namun django pada environment user berjalan pada versi y, maka hal tersebut dapat menyebabkan konflik dependensi. Hal yang sama berlaku untuk paket yang lain.
4. MVC, MVT, dan MVVM adalah pola desain (design pattern) yang digunakan dalam pengembangan perangkat lunak untuk mengorganisasi kode menjadi struktur yang lebih terstruktur dan mudah dikelola.
MVC atau Model View Controller adalah pola desain dalam membuat aplikasi dengan memisahkan kode menjadi tiga bagian utama yaitu Model, View, dan Controller. Model adalah bagian yang bertugas sebagai representasi data  dan untuk melakukan CRUD pada database. View adalah bagian yang bertugas menampilkan data aplikasi dalam bentuk Graphical User Interface (GUI). Sementara Controller adalah penghubung antara Model dan View. Controller berfungsi menerima dan memproses input user dan kemudian menghubungkan ke model untuk mengupdate database ataupun menghubungkan ke View untuk menampilkan view atau tampilan yang sesuai.
MVT atau Model View Template adalah pola desain dalam membuat aplikasi yang memisahkan kode menjadi tiga bagian utama, yaitu Model, View, dan Template. MVT merupakan pengembangan lebih lanjut dari MVC. Pada MVT, Model dan View sudah saling terhubung, berbeda dengan MVC yang mana Model dan View terisolasi satu sama lain. Kemudian, terdapat Template yang mana berfungsi untuk menampilkan tampilan atau Graphical User Interface (GUI) yang dinamis berdasarkan data yang dikirim dari View. Untuk Model, tidak ada perbedaan signifikan dengan Model di MVT. View di MVT bertugas untuk mengambil data dari Model dan menyiapkan data tersebut untuk ditampilkan dalam Template.
MVVM atau Model View View-Model adalah pola desain dalam membuat aplikasi yang memisahkan kode menjadi tiga bagian utama, yaitu Model, View, dan ViewModel. Pola desain ini memisahkan business logic dengan GUI. Model / entity adalah representasi dari data yang digunakan pada business logic. View adalah UI atau tampilan dari aplikasi itu sendiri dan berinteraksi langsung dengan user. View-Model adalah layer yang berfungsi untuk mengambil data dari Model dan mengirimkannya ke View untuk ditampilkan ke user. View-Model berperan sebagai perantara untuk data-binding yang mana View akan berubah otomatis sesuai dengan perubahan data pada model. ViewModel menghubungkan Model dengan View dan memastikan bahwa perubahan data pada Model tercermin secara real-time dalam tampilan aplikasi.
Perbedaan antara ketiganya adalah MVC memisahkan aplikasi menjadi Model, View, dan Controller dengan Controller sebagai perantara antara Model dan View. MVT, yang merupakan perkembangan dari MVC, menghubungkan Model dan View secara erat dan memanfaatkan Template untuk merender tampilan. Sementara itu, MVVM memisahkan Model, View, dan ViewModel, dengan ViewModel yang memfasilitasi pengikatan data, memungkinkan tampilan untuk berubah otomatis sesuai dengan perubahan data pada Model, sehingga membuat aplikasi lebih reaktif dan mudah diuji.

urls.py:
file urls.py adalah tempat untuk mendefinisikan rute untuk aplikasi pada projek django. Terdapat dua urls.py, yaitu urls.py yang berada di level projek dan urls.py yang berada di level aplikasi. urls.py yang berada di level projek berfungsi sebagai root yang digunakan untuk mendefinisikan rute tiap aplikasi atau dengan kata lain menghubungkan rute dasar dengan rute yang didefiniikan di urls.py yang berada di tingkat aplikasi. Sebagai contoh rute aplikasi admin memiliki awalan rute ‘/admin’, rute aplikasi main memiliki awalan rute ‘’, dan rute aplikasi chat memiliki awalan rute ‘/chat’ dan sebagainya.
File urls.py pada level aplikasi digunakan untuk menghubungkan rute spesifik untuk setiap aplikasi dengan fungsi views pada apliaksi tersebut yang sesuai. Rute pada aplikasi ini tentu saja mewarisi rute dasar yang sudah didefinisikan oleh file urls.py yang berada pada tingkat projek.
views.py:
File views.py berisi definisi fungsi-fungsi yang akan menangani permintaan klien. Pada file ini, kita dapat mengakses models dan memodifikasinya. Selain itu, kita juga dapat menentukan template yang harus dirender sesuai request tertentu.
models.py:

File models.py berisi definisi model atau struktur  untuk data pada aplikasi. Model juga merupakan representasi dari tabel di database dalam bentuk objek dan kelas di python. Model ini digunakan oleh views untuk mengambil, menyimpan, atau memanipulasi data dalam database.
Berkas HTML:
Berkas html pada django bisa dikatakan sebagai template yang berisi tampilan yang akan dikirimkan ke klien sebagai respons. Template HTML ini berisi markup dan sintaksis untuk menampilkan data dinamis yang diberikan oleh Views. Views menggunakan template ini untuk merender tampilan HTML yang akan dikirimkan ke klien sebagai respon.
Kaitan:
a.	Permintaan klien pertama kali mencocokkan URL yang dikirimkan ke urls.py.
b.	urls.py mengarahkan permintaan ke tampilan (views) yang sesuai.
c.	Fungsi di views.py menerima permintaan, berinteraksi dengan Model (jika perlu) untuk mengambil atau memanipulasi data, dan merender template HTML.
d.	Template HTML digunakan untuk merender tampilan akhir yang dikirimkan sebagai respons ke klien.

3. Kita perlu menggunakan virtual environment karena virtual environment memungkinkan kita untuk mengisolasi suatu proyek aplikasi. Dengan mengisolasinya, maka kita tidak perlu khawatir bahwa dependensi paket ataupun versi pada proyek tersebut akan saling bertentangan atau mempengaruhi proyek-proyek lainnya. Hal tersebut dapat mengatasi terjadinya resiko konflik antar proyek. Salah satu contohnya adalah kita dapat menggunakan versi django dan python yang berbeda pada projek yang berbeda.
Kita tetap dapat membuat projek django tanpa menggunakan virtual environment. Akan tetapi, resiko konflik dependensi akan mengintai projek kita. Hal tersebut karena apabila django pada projek kita berjalan pada versi x, namun django pada environment user berjalan pada versi y, maka hal tersebut dapat menyebabkan konflik dependensi. Hal yang sama berlaku untuk paket yang lain.
4. MVC, MVT, dan MVVM adalah pola desain (design pattern) yang digunakan dalam pengembangan perangkat lunak untuk mengorganisasi kode menjadi struktur yang lebih terstruktur dan mudah dikelola.
MVC atau Model View Controller adalah pola desain dalam membuat aplikasi dengan memisahkan kode menjadi tiga bagian utama yaitu Model, View, dan Controller. Model adalah bagian yang bertugas sebagai representasi data  dan untuk melakukan CRUD pada database. View adalah bagian yang bertugas menampilkan data aplikasi dalam bentuk Graphical User Interface (GUI). Sementara Controller adalah penghubung antara Model dan View. Controller berfungsi menerima dan memproses input user dan kemudian menghubungkan ke model untuk mengupdate database ataupun menghubungkan ke View untuk menampilkan view atau tampilan yang sesuai.
MVT atau Model View Template adalah pola desain dalam membuat aplikasi yang memisahkan kode menjadi tiga bagian utama, yaitu Model, View, dan Template. MVT merupakan pengembangan lebih lanjut dari MVC. Pada MVT, Model dan View sudah saling terhubung, berbeda dengan MVC yang mana Model dan View terisolasi satu sama lain. Kemudian, terdapat Template yang mana berfungsi untuk menampilkan tampilan atau Graphical User Interface (GUI) yang dinamis berdasarkan data yang dikirim dari View. Untuk Model, tidak ada perbedaan signifikan dengan Model di MVT. View di MVT bertugas untuk mengambil data dari Model dan menyiapkan data tersebut untuk ditampilkan dalam Template.
MVVM atau Model View View-Model adalah pola desain dalam membuat aplikasi yang memisahkan kode menjadi tiga bagian utama, yaitu Model, View, dan ViewModel. Pola desain ini memisahkan business logic dengan GUI. Model / entity adalah representasi dari data yang digunakan pada business logic. View adalah UI atau tampilan dari aplikasi itu sendiri dan berinteraksi langsung dengan user. View-Model adalah layer yang berfungsi untuk mengambil data dari Model dan mengirimkannya ke View untuk ditampilkan ke user. View-Model berperan sebagai perantara untuk data-binding yang mana View akan berubah otomatis sesuai dengan perubahan data pada model. ViewModel menghubungkan Model dengan View dan memastikan bahwa perubahan data pada Model tercermin secara real-time dalam tampilan aplikasi.
Perbedaan antara ketiganya adalah MVC memisahkan aplikasi menjadi Model, View, dan Controller dengan Controller sebagai perantara antara Model dan View. MVT, yang merupakan perkembangan dari MVC, menghubungkan Model dan View secara erat dan memanfaatkan Template untuk merender tampilan. Sementara itu, MVVM memisahkan Model, View, dan ViewModel, dengan ViewModel yang memfasilitasi pengikatan data, memungkinkan tampilan untuk berubah otomatis sesuai dengan perubahan data pada Model, sehingga membuat aplikasi lebih reaktif dan mudah diuji.
