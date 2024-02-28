import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { CreateBookDto } from './create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly appService: AppService) {}
  @Get()
  searchBooks(
    @Query('phrase') phrase?: string,
    @Query('price') price?: number,
  ) {
    if (phrase) {
      console.log('Search phrase:', phrase);
      return this.appService.searchBooks(phrase);
    } else if (price) {
      console.log('Search price:', price);
      return this.appService.getBooksExpensive(price);
    } else {
      console.log('No search parameters provided, returning all books.');
      return this.appService.getAllBooks();
    }
  }

  @Get('/average')
  averageCost() {
    return this.appService.averageCost();
  }

  @Get()
  getAllBooks() {
    return this.appService.getAllBooks();
  }

  @Get(':id')
  getBookId(@Param('id') id: string) {
    return this.appService.getBookId(id);
  }

  @Get()
  getBooksExpensive(@Query('price') price?: number) {
    return this.appService.getBooksExpensive(price);
  }

  @Post()
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.appService.createBook(
      createBookDto.id,
      createBookDto.title,
      createBookDto.author,
      createBookDto.price,
      createBookDto.availability,
      createBookDto.num_reviews,
      createBookDto.stars,
      createBookDto.description,
    );
  }
}
