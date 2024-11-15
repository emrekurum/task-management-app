
# Görev Yönetim Uygulaması

Bu proje, kullanıcıların görevlerini yönetmelerini sağlamak için geliştirilmiş bir görev yönetim uygulamasıdır. Kullanıcılar yeni görevler ekleyebilir, mevcut görevlerini güncelleyebilir, tamamlayabilir ve silebilir.

## Özellikler
- **Kullanıcı Kayıt ve Giriş Sistemi**: Kullanıcılar kayıt olabilir ve giriş yapabilirler.
- **Görev Yönetimi**:
  - Görev ekleyebilir, güncelleyebilir, tamamlayabilir ve silebilirler.
  - Görevler kullanıcıya özel olup yalnızca ilgili kullanıcıya gösterilir.
- **Filtreleme ve Sıralama**: Görevler, kategori veya tamamlanma durumuna göre filtrelenebilir, tarih veya başlık gibi kriterlere göre sıralanabilir.

## Teknolojiler
- **Frontend**: React.js
- **Backend**: Node.js, Express
- **Veritabanı**: MongoDB
- **Kimlik Doğrulama**: JSON Web Token (JWT)

## Başlangıç

Projeyi çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

### 1. Backend Kurulumu

1. **Backend Klasörüne Git**:
   ```bash
   cd backend
   ```

2. **Gerekli Bağımlılıkları Yükleyin**:
   ```bash
   npm install
   ```

3. **.env Dosyasını Yapılandırın**:
   `.env` dosyasını aşağıdaki gibi yapılandırın:
   ```plaintext
   MONGO_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your_jwt_secret_key
   ```

4. **MongoDB'yi Başlatın**:
   - Eğer MongoDB'yi bilgisayarınıza yüklemediyseniz, [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) veya Docker kullanabilirsiniz.

5. **Backend Sunucusunu Başlatın**:
   ```bash
   npm start
   ```

   Sunucu, `http://localhost:5000` adresinde çalışacaktır.

### 2. Frontend Kurulumu

1. **Frontend Klasörüne Git**:
   ```bash
   cd frontend
   ```

2. **Gerekli Bağımlılıkları Yükleyin**:
   ```bash
   npm install
   ```

3. **API URL ve Token'ı Yapılandırın**:
   `App.js` dosyasındaki API URL'sini ve JWT token'ını doğru şekilde yapılandırın:
   ```javascript
   const API_URL = 'http://localhost:5000/api/tasks'; // Backend URL
   const TOKEN = 'Bearer <YOUR_JWT_TOKEN>'; // Geçerli JWT token
   ```

4. **Frontend Uygulamasını Başlatın**:
   ```bash
   npm start
   ```

   Uygulama, `http://localhost:3000` adresinde çalışacaktır.

### 3. MongoDB Kullanımı
- MongoDB veritabanı, varsayılan olarak `localhost:27017` üzerinde çalışır. MongoDB'yi başlatmak için:
  ```bash
  mongod
  ```

### 4. API Endpoints

- **Kullanıcı Kayıt**:
  - `POST /api/auth/register`
  - Gerekli Alanlar: `username`, `email`, `password`
  
- **Kullanıcı Girişi**:
  - `POST /api/auth/login`
  - Gerekli Alanlar: `email`, `password`

- **Görev Listeleme**:
  - `GET /api/tasks/list`
  - Filtreleme ve sıralama için sorgu parametreleri:
    - `completed`: Tamamlanmış görevler için `true` veya `false`
    - `category`: Kategoriye göre filtreleme
    - `sortBy`: `createdAt` veya `title` (alfabetik sıralama)

- **Görev Ekleme**:
  - `POST /api/tasks/add`
  - Gerekli Alanlar: `title`, `description`, `category`

- **Görev Güncelleme**:
  - `PUT /api/tasks/update/:id`
  - Gerekli Alanlar: `title`, `description`, `category`

- **Görev Tamamlama**:
  - `PUT /api/tasks/complete/:id`

- **Görev Silme**:
  - `DELETE /api/tasks/:id`

## Katkıda Bulunma

Bu projeye katkıda bulunmak isterseniz, aşağıdaki adımları takip edebilirsiniz:

1. Bu repo'yu kendi hesabınıza fork edin.
2. Yeni bir branch oluşturun: `git checkout -b feature-xyz`
3. Yapmak istediğiniz değişiklikleri yapın ve commit edin.
4. Değişikliklerinizi push edin: `git push origin feature-xyz`
5. Pull request gönderin.

## Lisans

Bu proje [MIT Lisansı](https://opensource.org/licenses/MIT) ile lisanslanmıştır.
