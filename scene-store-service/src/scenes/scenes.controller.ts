import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";

import { SceneRegisterRequest } from "@base-sdk/base";

import { ScenesService } from "./scenes.service";

@Controller("/scenes")
export class ScenesController {
  constructor(private readonly scenesService: ScenesService) {}

  @UseGuards() // TODO: add s2s auth guard
  @Post("/new")
  async postRegisterScene(@Req() req, @Body() body: SceneRegisterRequest) {
    return await this.scenesService.registerScreen(req.user, body);
  }

  @UseGuards() // TODO: add s2s auth guard
  @Get("/:id")
  async getScene(
    @Req() req,
    @Param()
    params: {
      id: string;
    }
    // @Query() query: IGetSceneQuery
  ) {
    const id = params.id;
    return await this.scenesService.fetchScene(req.user, id);
  }

  @Post("/:id/sharing")
  async postUpdateSharingPolicy(
    @Req() req,
    @Param()
    params: {
      id: string;
    },
    @Body()
    body: {
      policy: string;
    }
  ) {
    return await this.scenesService.updateSharingPolicy(
      req.user,
      params.id,
      body
    );
  }

  /** public api (no guard) */
  @Get("/shared/:id")
  async getSharedScene(
    @Req() req,
    @Param()
    params: {
      id: string;
    }
    // @Query() query: IGetSceneQuery
  ) {
    const id = params.id;
    return this.scenesService.fetchSharedScene(id);
  }

  /**
   * by default, if no queries are provided, this will return all scenes in the project (included in request header).
   */
  @UseGuards() // TODO: add s2s auth guard
  @Get("/")
  async getScenes(@Req() req, @Query() query? /*notused*/) {
    return this.scenesService.fetchMyScenes(req.user);
  }
}
