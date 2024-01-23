# youtube-search

Solution for the FamPay Backend Assignment

## API Reference

---

### APIs for Users

---

#### Get videos

```http
  GET /api/videos?page=2&limit=4
```

|  Query  | Description                 |
| :-----: | --------------------------- |
| `page`  | Number of pages to skip     |
| `limit` | Number of video in one page |

#### Search by title or description

```http
  GET /api/videos/searcg?q=vlog
```

| Query | Description                                        |
| :---: | -------------------------------------------------- |
|  `q`  | Search query for searching in title or description |

---

---

### API for Internal Working

---

```http
  POST /api/videos/all
```

Example Body :
{
videos : [
{...},
{...},
{...}
]
}

## Installation

Run this project using node, follow these guidelines:

```bash
  git clone https://github.com/rakeshmeena5499/youtube-search.git
  cd youtube-search
  npm install
```

### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` - Any Empty Port for localhost

`MONGODB_URI` - MongoDB connection string

`YOUTUBE_TOKEN` - Secret YouTube API key

  
To run Development server
  
```bash
  npm run dev
```

Or run using

```bash
  npm start
```

---