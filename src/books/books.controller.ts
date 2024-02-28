import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { CreateBookDto } from './create-book.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('books')
export class BooksController {
    constructor(private readonly appService: AppService) { }
    @UseGuards(AuthGuard)
    @Get()
    searchBooks(@Query('phrase') phrase?: string, @Query('price') price?: number) {
        if (phrase) {
            return this.appService.searchBooks(phrase);
        } else if (price) {
            return this.appService.getBooksExpensive(price);
        } else {
            return this.appService.getAllBooks();
        }
    }

    @UseGuards(AuthGuard)
    @Get('/average')
    averageCost() {
        return this.appService.averageCost();
    }

    @UseGuards(AuthGuard)
    @Get()
    getAllBooks() {
        return this.appService.getAllBooks();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    getBookId(@Param('id') id: string) {
        return this.appService.getBookId(id);
    }

    @UseGuards(AuthGuard)
    @Get()
    getBooksExpensive(@Query('price') price?: number) {
        return this.appService.getBooksExpensive(price);
    }

    @UseGuards(AuthGuard)
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
