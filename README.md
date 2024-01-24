# youtube-search

FamPay Backend Assignment

## API Reference

---

### APIs for Users

---

#### Get videos

```bash
  GET /api/videos?page=1&limit=5
```

|  Query  | Description                 |
| :-----: | --------------------------- |
| `page`  | Number of pages to skip     |
| `limit` | Number of video in one page |

#### Search by title or description

```bash
  GET /api/videos/search?q=Investing
```

| Query | Description                                        |
| :---: | -------------------------------------------------- |
|  `q`  | Search query for searching in title or description |

---

### API for Polling Videos

---

```bash
  POST /api/videos/save
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

### Local Build 

Follow these steps to run this project locally:

```bash
  git clone https://github.com/rakeshmeena5499/youtube-search.git
  cd youtube-search
  npm install
```

---

### Docker Instructions

Follow these steps to run the application in a docker container:

Make sure you've docker installed on your system beforehand.

```bash
  docker build -t fampay .
  docker run -it -d -p 3000:3000 fampay
  docker exec -it <-put container ID here-> /bin/sh
 ```

 ---