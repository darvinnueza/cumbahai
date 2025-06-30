package com.bahai.community.resource;

import java.util.List;
import jakarta.ws.rs.*;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.MediaType;
import jakarta.transaction.Transactional;
import com.bahai.community.mapper.GroupMapper;
import com.bahai.community.service.GroupService;
import com.bahai.community.resource.dto.ApiResponse;
import com.bahai.community.resource.dto.GroupRequest;
import com.bahai.community.resource.dto.GroupResponse;
import com.bahai.community.resource.dto.ApiErrorResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

@Path("/api/v1/groups") // 🆕 cambia endpoint base
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Group", description = "Operations related to Groups of People")
public class GroupResource {

    @Inject
    GroupService service;

    @Inject
    GroupMapper mapper;

    @GET
    public Response findAll() {
        try {
            List<GroupResponse> groups = service.findAll();
            return Response.ok(new ApiResponse<>(
                    "success",
                    groups,
                    "Grupos obtenidos exitosamente"
            )).build();
        } catch (Exception ex) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(
                    new ApiErrorResponse("error", "No se pudo obtener la lista de grupos", "GROUP_LIST_FAILED")
            ).build();
        }
    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Long id) {
        try {
            GroupResponse group = service.findById(id);
            if (group == null) {
                return Response.status(Response.Status.NOT_FOUND).entity(
                        new ApiErrorResponse("error", "Grupo no encontrado", "GROUP_NOT_FOUND")
                ).build();
            }

            return Response.ok(new ApiResponse<>(
                    "success",
                    group,
                    "Grupo obtenido exitosamente"
            )).build();
        } catch (Exception ex) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(
                    new ApiErrorResponse("error", "No se pudo obtener el grupo", "GROUP_FETCH_FAILED")
            ).build();
        }
    }

    @GET
    @Path("/by-type/{typeId}")
    public Response findByTypeId(@PathParam("typeId") Long typeId) {
        try {
            List<GroupResponse> groups = service.findByTypeId(typeId);

            return Response.ok(new ApiResponse<>(
                    "success",
                    groups,
                    "Grupos obtenidos exitosamente por tipo"
            )).build();

        } catch (Exception ex) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(
                    new ApiErrorResponse("error", "No se pudo obtener los grupos por tipo", "GROUP_BY_TYPE_FAILED")
            ).build();
        }
    }

    @POST
    @Transactional
    public Response create(GroupRequest request) {
        try {
            GroupResponse group = service.save(request);

            return Response.status(Response.Status.CREATED).entity(
                    new ApiResponse<>("success", group, "Grupo creado exitosamente")
            ).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(
                    new ApiErrorResponse("error", e.getMessage(), "GROUP_CREATION_FAILED")
            ).build();
        }
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response update(@PathParam("id") Long id, GroupRequest request) {
        try {
            GroupResponse updatedGroup = service.update(id, request);
            return Response.ok(new ApiResponse<>(
                    "success",
                    updatedGroup,
                    "Grupo actualizado exitosamente"
            )).build();
        } catch (NotFoundException ex) {
            return Response.status(Response.Status.NOT_FOUND).entity(
                    new ApiErrorResponse("error", ex.getMessage(), "GROUP_UPDATE_NOT_FOUND")
            ).build();
        } catch (Exception ex) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(
                    new ApiErrorResponse("error", ex.getMessage(), "GROUP_UPDATE_FAILED")
            ).build();
        }
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        try {
            boolean deleted = service.delete(id);
            if (!deleted) {
                return Response.status(Response.Status.NOT_FOUND).entity(
                        new ApiErrorResponse("error", "Grupo no encontrado", "GROUP_NOT_FOUND")
                ).build();
            }

            return Response.ok(new ApiResponse<>("success", null, "Grupo eliminado exitosamente")).build();
        } catch (Exception ex) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(
                    new ApiErrorResponse("error", ex.getMessage(), "GROUP_DELETE_FAILED")
            ).build();
        }
    }
}