import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import * as fs from 'fs';

const path = process.cwd();
const relPath = '\\src\\data\\data.json';
const ruta = `${path}${relPath}`;
const file = fs.readFileSync(ruta, 'utf-8');

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, World!';
  }

  getAllBooks(): object {
    return JSON.parse(file);
  }

  getBookId(@Param('id') id: string): string {
    const obj = JSON.parse(file);
    const bookId = obj.find((book) => book.id == id);

    if (bookId) {
      return bookId;
    } else {
      throw new BadRequestException('ID not found');
    }
  }

  getBooksExpensive(price: number): object {
    const obj = JSON.parse(file);
    const books = obj.filter((books) => books.price >= price);
    if (!isNaN(price)) {
      if (books.length > 0) {
        return books;
      } else {
        throw new NotFoundException('Not found any books');
      }
    } else {
      throw new BadRequestException('Price is not a number');
    }
  }
  createBook(
    id: string,
    title: string,
    author: string,
    price: number,
    availability: number,
    num_reviews: number,
    stars: number,
    description: string,
  ): object {
    if (
      id &&
      title &&
      author &&
      price &&
      availability &&
      num_reviews &&
      stars &&
      description
    ) {
      // si se encuentran todos los campos
      if (
        !isNaN(price) &&
        !isNaN(availability) &&
        !isNaN(num_reviews) &&
        !isNaN(stars)
      ) {
        // si algun campo es invalido en el caso de campos numerios, no ser el tiipo
        const obj = JSON.parse(file);
        obj.push({
          id,
          title,
          author,
          price,
          availability,
          num_reviews,
          stars,
          description,
        });
        return obj;
      } else {
        throw new BadRequestException('Invalid data is provided');
      }
    } else {
      throw new BadRequestException('Invalid data is provided');
    }
  }

  searchBooks(phrase: string): object {
    let filteredBooks;
    if (!/^[a-zA-Z]+$/.test(phrase)) {
      // he utilizado expresiones regulares ya que en la especificacion ES6 está permitida.
      throw new BadRequestException('Invalit data');
    } else {
      const obj = JSON.parse(file);
      const valPhrase = phrase.split('');

      filteredBooks = obj.filter((books) => {
        const author = books.author.toLowerCase();
        return valPhrase.every((char) => author.includes(char.toLowerCase()));
      });

      if (filteredBooks.length === 0) {
        throw new NotFoundException('Not found any book');
      }
    }
    return filteredBooks;
  }

  averageCost(): object {
    const obj = JSON.parse(file);
    let prices = 0;
    for (let i = 0; i < obj.length; i++) {
      prices += obj[i].price;
    }
    const average = parseFloat((prices / obj.length).toFixed(2));
    return { average: average };
  }
}
