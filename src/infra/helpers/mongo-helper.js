const { MongoClient } = require('mongodb')

module.exports = {
  async connect (uri) {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    this.db = this.client.db()
  },

  async disconnect () {
    this.db = null
    await this.client.close()
  },

  async getCollection (name) {
    if (!this.db) {
      await this.connect(this.uri)
    }
    return this.db.collection(name)
  }
}
